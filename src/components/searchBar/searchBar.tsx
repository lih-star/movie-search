import styles from "./SearchBar.module.css";

type Props = {
  defaultValue?: string;
  onSearch: (query: string) => void;
};

export default function SearchBar({ defaultValue = "", onSearch }: Props) {
  return (
    <form
      className={styles.wrapper}
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const q = new FormData(e.currentTarget).get("q");
        onSearch(String(q ?? "").trim());
      }}
    >
      <input
        className={styles.input}
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="영화 제목을 검색하세요"
        aria-label="영화 검색"
      />
    </form>
  );
}