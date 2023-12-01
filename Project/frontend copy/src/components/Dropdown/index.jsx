export default function index({ title, options, onSelect, disabled }) {
  return (
    <div className={`dropdown ${disabled ? "opacity-50" : ""}`}>
      <label
        tabIndex={0}
        className={`btn m-1 ${disabled ? "cursor-not-allowed" : ""}`}
      >
        {title || "Title"}
      </label>
      <ul
        tabIndex={0}
        className={`dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 ${
          disabled ? "hidden" : ""
        }`}
      >
        {!disabled &&
          options.map((team, i) => (
            <li key={i} onClick={() => onSelect(team)}>
              <a className="color:rgb(255,255,255) value">{team}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}
