/** Confirmed camp clinician profiles. Add further profiles as they are supplied. */
export interface Clinician {
	name: string;
	roles: string[];
	image: string;
	imageAlt: string;
	overview: string;
	experience: { value: string; label: string }[];
	details?: string[];
	quote?: string;
}

export const clinicians: Clinician[] = [
	{
		name: "Nate Starr",
		roles: [
			"Owner, 850 Officials Association",
			"Panhandle Conference Coordinator",
			"NCAA Baseball Umpire",
		],
		image: "/images/nate-starr.webp",
		imageAlt: "Portrait of Nate Starr",
		overview:
			"Nate has worked at the high school, collegiate, and professional levels. Dedicated to recruiting, training, and mentoring officials, he emphasizes professionalism, integrity, preparation, and leadership on the field.",
		experience: [
			{ value: "24+", label: "Years in high school athletics" },
			{ value: "20+", label: "Years as an NCAA baseball umpire" },
			{ value: "6", label: "Years as a Minor League Baseball fill-in umpire" },
		],
		quote:
			"Officiating is more than making the right call. It's about integrity, preparation, leadership, and earning respect through professionalism.",
	},
	{
		name: "David Arrieta",
		roles: [
			"MLB Call-Up Umpire",
			"Triple-A Crew Chief",
			"2026 World Baseball Classic",
		],
		image: "/images/david-arrieta-portrait.webp",
		imageAlt: "Portrait of David Arrieta",
		overview:
			"David has officiated at the highest levels of baseball, from the Venezuelan Winter League and Minor League Baseball through the Caribbean Series and World Baseball Classic. He brings extensive experience in two-man mechanics, positioning, and game management to the camp.",
		experience: [
			{ value: "20+", label: "Years in Venezuelan Winter League" },
			{ value: "17", label: "Winter League championships" },
			{ value: "6", label: "Years as an MLB call-up umpire" },
		],
		details: [
			"Venezuelan Winter League: 15 years as crew chief and 7 Caribbean Series.",
			"Minor League Baseball: 14 years, including 9 at Triple-A and 7 as a Triple-A crew chief.",
			"NCAA Division I & II: assignments in the ACC, American Conference, and FCU.",
		],
	},
];
