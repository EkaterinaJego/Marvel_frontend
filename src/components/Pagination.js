import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./pagination.css";

const Pagination = ({ limit, skip, setSkip }) => {
  return (
    <div className="pagination-main">
      {skip >= limit && (
        <div className="previous-page">
          <FontAwesomeIcon
            icon="chevron-circle-left"
            className="pagination-icon"
            onClick={() => {
              // console.log("PREV / skip = ", skip);
              const newSkip = skip - limit;
              // console.log("PREV / newSkip = ", newSkip);
              setSkip(newSkip);
            }}
          />
        </div>
      )}
      <div className="number">PAGE {skip / limit + 1}</div>
      <div className="next-page">
        <FontAwesomeIcon
          icon="chevron-circle-right"
          className="pagination-icon"
          onClick={() => {
            const newSkip = skip + limit;
            setSkip(newSkip);
          }}
        />
      </div>
    </div>
  );
};

export default Pagination;
