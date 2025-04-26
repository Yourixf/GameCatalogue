import windwows from "../../assets/platforms/windows.png";
import apple from "../../assets/platforms/apple.png";
import playstation from "../../assets/platforms/playstation.png";
import xbox from "../../assets/platforms/xbox.png";
import android from "../../assets/platforms/android.png";
import nitendoswitch from "../../assets/platforms/nitendoswitch.png";
import web from "../../assets/platforms/web.png";
import './GamePlatformIcons.css'

function GamePlatformIcons ({platforms, className=""}) {

    const platformIdList = {
        pc: [1],
        apple: [5, 4],
        playstation: [2],
        xbox: [3],
        android: [8],
        nitendo: [7],
        web: [14]
    };

    const platformIconList = {
        pc: windwows,
        apple: apple,
        playstation: playstation,
        xbox: xbox,
        android: android,
        nitendo: nitendoswitch,
        web: web
    };

    function getMatchedPlatforms() {
        if (!platforms) return [];

        const addedCategories = new Set();

        return platforms
            .map(platform => {
                const category = Object.keys(platformIdList).find(key =>
                    platformIdList[key].includes(platform.platform.id)
                );

                if (category && !addedCategories.has(category)) {
                    addedCategories.add(category);
                    return { category, icon: platformIconList[category]};
                }
                return null;
            })
            .filter(Boolean);
    }
    const matchedPlatforms = getMatchedPlatforms();

    return (
        <figure className={`game-platforms ${className}`}>
            {matchedPlatforms.map(({ category, icon }) => (
                <img title={category} key={category} className="platform-icon" src={icon} alt={`${category}-icon`} />
            ))}
        </figure>
    );
}

export default GamePlatformIcons;