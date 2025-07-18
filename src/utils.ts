import type { TDropdownOption } from "./types";

export function getLabelFromOption<T extends TDropdownOption>(option: T) {
	return typeof option === "string" ? option : option.label;
}

export function getSearchQueryLabelFromOption<T extends TDropdownOption>(option: T) {
	if (typeof option === "string") {
		return option;
	}
	if (option.isNewValue) {
		return option.value;
	}
	return option.label;
}

export function getValueFromOption<T extends TDropdownOption>(
	option: T,
	// searchOptionKeys is used to know whether our options are strings or objects
	searchOptionKeys: string[] | undefined,
): T {
	if (typeof option === "string") return option;

	if (searchOptionKeys) {
		if (option.isNewValue) return { label: option.value, value: option.value } as T;
		return option;
	}

	// this happens when the option comes from a user generated new value and the searchOptionKeys is not provided
	// so the options variable is an array of strings
	return option.value as T;
}

export function createValueFromSearchQuery<T extends TDropdownOption>(
	searchQuery: string,
	// searchOptionKeys is used to know whether our options are strings or objects
	searchOptionKeys: string[] | undefined,
) {
	if (searchOptionKeys?.length) {
		const newOption = {
			label: searchQuery,
			value: searchQuery,
		};
		return newOption as T;
	}
	return searchQuery as T;
}

export function getValueStringFromOption<T extends TDropdownOption>(
	option: T,
	searchOptionKeys: string[] | undefined,
) {
	const value = getValueFromOption(option, searchOptionKeys);

	if (typeof value === "string") return value;
	return value.value;
}

export function sanitizeForTestId(str: string): string {
	return str
		.replace(/[^a-zA-Z0-9]/g, "-") // Replace special chars with hyphens
		.replace(/-+/g, "-") // Replace multiple consecutive hyphens with single hyphen
		.replace(/^-|-$/g, "") // Remove leading and trailing hyphens
		.toLowerCase();
}
