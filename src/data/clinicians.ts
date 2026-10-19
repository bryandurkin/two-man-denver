/** Confirmed camp clinician profiles. Add further profiles as they are supplied. */
export interface Clinician {
	name: string;
	roles: string[];
	image: string;
	imageAlt: string;
	overview: string;
	experience: { value: string; label: string }[];
	quote: string;
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
];
