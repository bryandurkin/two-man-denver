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
	address: string;
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
	address: "50 Chip Seal Parkway\nPanama City Beach, FL 32407",
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
		{ date: "Thursday, Dec 10", name: "Day 1", details: "6:00 PM–9:00 PM\nClassroom session" },
		{ date: "Friday, Dec 11", name: "Day 2", details: "8:00 AM–4:00 PM" },
		{ date: "Saturday, Dec 12", name: "Day 3", details: "8:00 AM–4:00 PM" },
		{ date: "Sunday, Dec 13", name: "Day 4", details: "8:00 AM–Noon" },
	],
	instructors_headline: "College supervisors & MiLB umpires",
	instructors_note: "College coordinators in attendance.",
	instructor_names: "",
	gear_note: "Bring all umpire gear and be prepared for live-game assignments during camp.",
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
	// The confirmed address belongs to this venue. A future venue change must
	// supply its own address instead of inheriting the Publix Sports Park address.
	if ((camp.venue !== DEFAULTS.venue || camp.city !== DEFAULTS.city) && !data.address?.trim()) {
		camp.address = "";
	}
	// The original seed has schedule rows with empty details. Fill only those
	// matching rows, keeping any schedule entered in the CMS authoritative.
	camp.schedule = camp.schedule.map((day) => {
		const fallback = DEFAULTS.schedule.find((item) => item.date === day.date && item.name === day.name);
		return day.details?.trim() || !fallback ? day : { ...day, details: fallback.details };
	});
	// Retire the original seed wording now that Thursday is a classroom session.
	// Any other gear note entered in the CMS is preserved.
	if (camp.gear_note === "Bring all umpire gear and be prepared for live-game assignments every day of camp.") {
		camp.gear_note = DEFAULTS.gear_note;
	}
	// Spread these onto elements so a logged-in admin can click to edit (empty object when not available).
	const edit = (entry?.edit ?? {}) as Record<string, Record<string, string>>;
	return { camp, edit, cacheHint };
}

/** Standard HTTPS directions links work in map apps and on the web. */
export function getDirections(camp: Pick<CampInfo, "venue" | "city" | "address">) {
	const address = (camp.address || camp.city).trim().replace(/\s*\n\s*/g, ", ");
	const destination = [camp.venue, address].filter(Boolean).join(", ");
	const google = new URLSearchParams({ api: "1", destination, travelmode: "driving" });
	// Keep the exact place selected in the supplied Maps link for the confirmed venue.
	if (camp.venue === DEFAULTS.venue && camp.city === DEFAULTS.city && camp.address === DEFAULTS.address) {
		google.set("destination_place_id", "ChIJKRpVOlKPk4gRKPyLAblqab0");
	}
	const apple = new URLSearchParams({ destination, mode: "driving" });
	return {
		address,
		googleMaps: `https://www.google.com/maps/dir/?${google}`,
		appleMaps: `https://maps.apple.com/directions?${apple}`,
	};
}

/** "850-867-9670" -> "tel:+18508679670" */
export function telHref(phone: string) {
	const digits = phone.replace(/\D/g, "");
	return `tel:+${digits.length === 10 ? "1" + digits : digits}`;
}
