import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import usePostsQuery from "../../../modules/posts/services/usePostsQuery";
import AutoComplete, { Suggestion } from "../AutoComplete";
import styles from "./styles.module.css";

export default function Header() {
  const navigate = useNavigate();
  const { data = [] } = usePostsQuery();
  const [isScrolled, setIsScrolled] = useState(false);

  const suggestions = data.map((post) => ({
    name: post.title,
    image: post.thumbnail_url,
    description: post.content.slice(0, 100),
    id: post.id,
  }));

  const handleSelect = useCallback(
    (suggestion: Suggestion) => {
      navigate(`/posts/${suggestion.id}`);
    },
    [navigate]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>dentsu</h1>
          <span>world services</span>
        </div>

        <div className={styles.autocomplete}>
          <AutoComplete
            suggestions={suggestions}
            id="autocomplete"
            onSelect={handleSelect}
          />
        </div>
      </div>
    </header>
  );
}
