import { useState, useRef, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

const ExpandableText = ({ text = "" }) => {
  const maxBaseChars = 200;
  const [expanded, setExpanded] = useState(false);
  const [preview, setPreview] = useState(text);
  const [maxChars, setMaxChars] = useState(maxBaseChars);
  const containerRef = useRef(null);
  const isLongText = useMemo(() => text.length > maxChars, [text, maxChars]);

  useEffect(() => {
    const handleWindowSize = () => {
      const width = window.innerWidth;
      const newMaxChars =
        width < 500
          ? maxBaseChars * 1.5
          : width >= 500 && width < 770
            ? maxBaseChars * 2.3
            : maxBaseChars;
      setMaxChars(newMaxChars);
      console.log(newMaxChars);
    };

    handleWindowSize();
    window.addEventListener("resize", handleWindowSize);
    return () => window.removeEventListener("resize", handleWindowSize);
  }, [maxChars]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        expanded &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      )
        setExpanded(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [expanded]);

  useEffect(() => {
    setPreview(
      isLongText && !expanded ? `${text.slice(0, maxChars)} ... ` : text
    );
  }, [text, maxChars, expanded]);

  return (
    <div ref={containerRef} className={`my-2 ${expanded ? "h-full" : "h-48"}`}>
      <p className="inline">
        {preview}
        {isLongText && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 text-blue-600 hover:underline text-sm"
          >
            {expanded ? "show less" : "show more"}
          </button>
        )}
      </p>
    </div>
  );
};

ExpandableText.propTypes = {
  text: PropTypes.string.isRequired,
};

const NewsView = ({ data }) => {
  if (!Array.isArray(data) || data.length == 0) {
    return <h1>No news items to display</h1>;
  }

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 my-4">
      {data.map((d, i) => (
        <article
          key={`${i}-${d.Id}`}
          className="flex flex-col border px-4 py-2 bg-gray-100"
        >
          <h2 className="text-xl font-bold">{d.Title}</h2>
          <span className="text-l italic font-semibold">
            {d.Country} | {d.Symbol} | {d.Date}
            {d.Country !== d.Category && ` | ${d.Category}`}
          </span>
          <ExpandableText text={d.Description || ""} />
        </article>
      ))}
    </div>
  );
};

NewsView.propTypes = { data: PropTypes.array.isRequired };

export default NewsView;
