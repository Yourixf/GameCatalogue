import './SortingFilter.css';

function SortingFilter ({className="", type='sorting', content}) {
    //temp theme, when merged ill implement ThemeProvider
    const selectedTheme = "dark-mode";

    const filterOptions = {
        option1: "filter optie 1",
        option2: "filter optie 2",
    }

    const sortingOptions = {
        option1: "sorteer optie 1",
        option2: "sorteer optie 2",
    }

    const optionList = type === "filter" ? filterOptions : sortingOptions;

    return(
        <div className={`sorting-filter ${type} ${className} ${selectedTheme}`}>
            <p className={`sorting-filter-label`}>{content}</p>
            <p className={`sorting-filter-dropdown-icon`}>v</p>
        </div>
    )
}

export default SortingFilter;