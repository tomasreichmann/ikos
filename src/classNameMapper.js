export default function classNameMapper(classMap, prefix = "") {
	return Object.keys(classMap).reduce( (classList, cls) => (
		classMap[cls] ? [...classList, prefix + cls] : classList
	), [] );
};
