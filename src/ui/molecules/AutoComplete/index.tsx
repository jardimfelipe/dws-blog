import { useMemo, useState } from "react";

import SearchButton from "../../atoms/SearchButton";
import TextField from "../../atoms/TextField";
import style from "./styles.module.css";
import useMediaQuery from "../../../utils/useMediaQuery";

export type Suggestion = {
  name: string;
  description?: string;
  image?: string;
  id: string;
};

type Props = {
  suggestions: Array<Suggestion>;
  id: string;
  placeholder?: string;
  onSelect: (suggestion: Suggestion) => void;
};

export default function AutoComplete({
  suggestions,
  id,
  placeholder = "Search",
  onSelect,
}: Props) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const filteredSuggestions = useMemo(() => {
    if (searchTerm === "") {
      return suggestions;
    }

    return suggestions.filter((suggestion) =>
      suggestion.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, suggestions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setSearchTerm("");
      setShowSuggestions(false);
      return;
    }
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveSuggestionIndex((prevIndex) => {
          if (prevIndex === -1) {
            return 0;
          }

          if (prevIndex === filteredSuggestions.length - 1) {
            return -1;
          }

          return prevIndex + 1;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveSuggestionIndex((prevIndex) => {
          if (prevIndex === -1) {
            return filteredSuggestions.length - 1;
          }

          if (prevIndex === 0) {
            return -1;
          }

          return prevIndex - 1;
        });
        break;
      case "Enter":
        e.preventDefault();
        if (activeSuggestionIndex >= 0) {
          onSelect(filteredSuggestions[activeSuggestionIndex]);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className={style.container}>
      <label htmlFor="autocomplete-input" className="sr-only">
        Search
      </label>
      {isMobile ? (
        <SearchButton />
      ) : (
        <TextField
          aria-autocomplete="list"
          aria-controls="autocomplete-list"
          id={id}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
          endAdornment={<SearchButton />}
        />
      )}
      {showSuggestions ? (
        <ul
          id="autocomplete-list"
          className={style.suggestionList}
          role="listbox"
        >
          {filteredSuggestions.length ? (
            filteredSuggestions.map((suggestion, index) => (
              <li
                onClick={() => onSelect(suggestion)}
                role="option"
                key={suggestion.id}
                className={[
                  style.suggestionItem,
                  activeSuggestionIndex === index ? style.active : null,
                ].join(" ")}
              >
                <img src={suggestion.image} alt={suggestion.name} />
                <div className={style.suggestionContent}>
                  <p className={style.suggestionName}>{suggestion.name}</p>
                  <p className={style.suggestionDescription}>
                    {suggestion.description}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <li className={style.nothingFound}>Nothing found</li>
          )}
        </ul>
      ) : null}
    </div>
  );
}
