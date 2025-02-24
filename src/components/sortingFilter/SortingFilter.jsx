import './SortingFilter.css';
import {useContext, useState} from "react";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import Label from "../label/Label.jsx";
import Input from "../input/Input.jsx";
import Button from "../button/Button.jsx";

function SortingFilter ({className="", type='sorting', content}) {
    const { selectedTheme } = useContext(ThemeContext)
    const [dropdown, dropdownToggle ] = useState(false);

    function dropdownClick () {
        console.log(dropdown);
        dropdownToggle(!dropdown);
        console.log(dropdown);
    }

    // filter: genres - publishers -
    // sort: release date - alphabetical order


    // filter options needs to be

    return(
        <div className={`sorting-filter ${type} ${className} ${selectedTheme} ${[dropdown ? " dropdown-menu-active" : "dropdown-menu-inactive"]}`}>
            <div className={"sorting-filter-main-wrapper"}>
                <p className={`sorting-filter-label`}>{content}</p>
                <p onClick={dropdownClick}
                   className={`sorting-filter-dropdown-icon ${[dropdown ? " dropdown-menu-active" : ""]}`}>v</p>
            </div>


            <div className={`sorting-filter-dropdown-options ${[dropdown ? " dropdown-menu-active" : "dropdown-menu-inactive"]}`}>

                { type === "sorting" ? [
                    <Label htmlFor={"sorting-release-date"} >
                        Release datum
                        <Input
                            type={"radio"}
                            className={"sorting-release-date"}
                            id={"sorting-release-date"}
                            name={"sorting-options"}
                        />
                    </Label>
                    ,
                    <Label htmlFor={"sorting-alphabetical-order"} >
                        Alphabetische volgorde
                        <Input
                            type={"radio"}
                            className={"sorting-alphabetical-order"}
                            id={"sorting-alphabetical-order"}
                            name={"sorting-options"}
                        />
                    </Label>
                    ] :

                    [
                        <p>Genres:</p>,
                        <Label htmlFor={"filter-genre"}>
                            Actie
                            <Input
                                type={"checkbox"}
                                className={"filter-genre"}
                                id={"filter-genre"}
                                name={"filter-options"}
                            />
                        </Label>
                        ,

                        <p>Uitgevers:</p>,


                        <Label htmlFor={"filter-publisher"}>
                            Steam
                            <Input
                                type={"checkbox"}
                                className={"sorting-alphabetical-order"}
                                id={"sorting-alphabetical-order"}
                                name={"filter-options"}
                            />
                        </Label>,

                        <p>Platform:</p>,

                        <Label htmlFor={"filter-platform"}>
                            PC
                            <Input
                                type={"checkbox"}
                                className={"filter-platform"}
                                id={"filter-platform"}
                                name={"filter-options"}
                            />
                        </Label>
                    ]
                }

                <Button className={"apply-options" } content={"Toepassen"}/>
                <Button className={"delete-options" } content={"Verwijderen"}/>


            </div>
        </div>
    )
}

export default SortingFilter;