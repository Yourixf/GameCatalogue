import './SortingFilter.css';
import {useContext, useState} from "react";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import Label from "../label/Label.jsx";
import Input from "../input/Input.jsx";
import Button from "../button/Button.jsx";

function SortingFilter ({className="", type='sorting', content, onOptionChange, sortType}) {
    const { selectedTheme } = useContext(ThemeContext)
    const [dropdown, dropdownToggle ] = useState(false);
    const [ sortOption, setSortOption ] = useState('');
    const [ filterOption, setFilterOption ] = useState('');

    function dropdownClick () {
        console.log(dropdown);
        dropdownToggle(!dropdown);
        console.log(dropdown);
    }

    const sortingOptions = [
        { value: "name", label: "Alphabetisch" },
        { value: "released", label: "Release Datum" },
    ];

    const filterOptions = [
        { value: "action", label: "Actie" },
        { value: "adventure", label: "Avontuur" },
        { value: "shooter", label: "Shooter" },
        { value: "strategy", label: "Strategie" },
        { value: "role-playing-games-rpg", label: "RPG" },
        { value: "simulation", label: "Simulatie" },
        { value: "puzzle", label: "Puzzel" }
    ];

    const options = type === "sorting" ? sortingOptions : filterOptions;

    function handleOptionChange (option) {
        console.log(option)
        type === "sorting" ?
            setSortOption(option) :
            setFilterOption(prevFilters =>
                prevFilters.includes(option)
                    ? prevFilters.filter(f => f !== option)
                    : [...prevFilters, option]
            );
    }

    function handleApplyClick () {
        console.warn('32 jaajajajaj aangreopen')
        // onOptionChange(sortOption)
        onOptionChange(type === "sorting" ? sortOption : filterOption)
    }

    function handleDeleteClick () {
        console.warn("handledeleteclick aangeroepen")

        onOptionChange("")
    }

    // filter: genres - publishers -
    // sort: release date - alphabetical order

    return (
        <div className={`sorting-filter ${type} ${className} ${selectedTheme} ${[dropdown ? " dropdown-menu-active" : "dropdown-menu-inactive"]}`}>
            <div className={"sorting-filter-main-wrapper"}>
                <p className={`sorting-filter-label`}>{content}</p>
                <p onClick={dropdownClick}
                   className={`sorting-filter-dropdown-icon ${[dropdown ? " dropdown-menu-active" : ""]}`}>v</p>
            </div>


            <div className={`sorting-filter-dropdown-options ${[dropdown ? " dropdown-menu-active" : "dropdown-menu-inactive"]}`}>

                {options.map(option => (
                    <Label key={option.value} htmlFor={option.value}>
                        {option.label}
                        <Input
                            type={type === "sorting" ? "radio" : "checkbox"}
                            id={option.value}
                            name={type === "sorting" ? "sorting-options" : "filter-options"}
                            value={option.value}
                            checked={(type === "sorting" ?
                                sortType === option.value :
                                filterOption.includes(option.value))}
                            onChange={() => handleOptionChange(option.value)}

                        />
                    </Label>
                ))}



                <Button onClick={handleApplyClick} className={"apply-options" } content={"Toepassen"}/>
                <Button onClick={handleDeleteClick} className={"delete-options" } content={"Verwijderen"}/>


            </div>
        </div>
    )
}

export default SortingFilter;