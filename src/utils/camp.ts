import { getEmDashEntry } from "emdash";

/**
 * Camp details live in the EmDash "Camp Info" collection (one entry, slug "two-man-camp"),
 * so Denver can change dates, prices, schedule and contact info from the admin.
 * The defaults below only show if that entry is missing or a field is left empty.
 */

export const CAMP_SLUG = "two-man-camp";

export interface CampInfo {
	title: string;
	dates: string;
	venue: string;
	city: string;
	intro: string;
	early_price: string;
	early_deadline: string;
	regular_price: string;
	registration_url: string;
	payment_info: string;
	phone: string;
	email: string;
	contact_name: string;
	focus_items: { label: string }[];
	schedule: { date: string; name: string; details?: string }[];
	instructors_headline: string;
	instructors_note: string;
	instructor_names: string;
	gear_note: string;
	location_notes: string;
	map_url: string;
}

const DEFAULTS: CampInfo = {
	title: "Two-Man Instructional Camp",
	dates: "December 10-13",
	venue: "Publix Sports Park",
	city: "Panama City Beach, Florida",
	intro:
		"Join top officials, college coaches, and experienced instructors for an intensive two-man mechanics camp designed to take your game to the next level.",
	early_price: "$150",
	early_deadline: "November 28, 2026",
	regular_price: "$175",
	registration_url: "",
	payment_info: "",
	phone: "850-867-9670",
	email: "Denver.dangerfield.9.01c@gmail.com",
	contact_name: "Denver Dangerfield",
	focus_items: [
		{ label: "Two-man mechanics" },
		{ label: "Handling situations" },
		{ label: "Positioning" },
		{ label: "Game management" },
		{ label: "On-field evaluations" },
		{ label: "Live games with feedback" },
		{ label: "Rule interpretation" },
		{ label: "Q&A with college coaches" },
	],
	schedule: [
		{ date: "Thursday, Dec 10", name: "Day 1" },
		{ date: "Friday, Dec 11", name: "Day 2" },
		{ date: "Saturday, Dec 12", name: "Day 3" },
		{ date: "Sunday, Dec 13", name: "Day 4" },
	],
	instructors_headline: "College supervisors & MiLB umpires",
	instructors_note: "College coordinators in attendance.",
	instructor_names: "",
	gear_note: "Bring all umpire gear and be prepared for live-game assignments every day of camp.",
	location_notes: "",
	map_url: "",
};

function pick<T>(value: T | null | undefined, fallback: T): T {
	if (value === null || value === undefined) return fallback;
	if (typeof value === "string" && value.trim() === "" && typeof fallback === "string" && fallback !== "")
		return fallback;
	if (Array.isArray(value) && value.length === 0) return fallback;
	return value;
}

export async function getCamp() {
	const { entry, cacheHint } = await getEmDashEntry("camp", CAMP_SLUG);
	const data = (entry?.data ?? {}) as Partial<CampInfo>;
	const camp = Object.fromEntries(
		(Object.keys(DEFAULTS) as (keyof CampInfo)[]).map((key) => [key, pick(data[key] as never, DEFAULTS[key] as never)]),
	) as CampInfo;
	// Spread these onto elements so a logged-in admin can click to edit (empty object when not available).
	const edit = (entry?.edit ?? {}) as Record<string, Record<string, string>>;
	return { camp, edit, cacheHint };
}

/** "850-867-9670" -> "tel:+18508679670" */
export function telHref(phone: string) {
	const digits = phone.replace(/\D/g, "");
	return `tel:+${digits.length === 10 ? "1" + digits : digits}`;
}
