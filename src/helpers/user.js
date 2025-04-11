import { profilePictures } from "../assets/profilePictures/profilePictures";

export function getProfilePictureSrc(rawInfo) {
    let filename = "defaultProfile.png";

    if (rawInfo) {
        try {
            const parsedInfo = typeof rawInfo === "string" ? JSON.parse(rawInfo) : rawInfo;

            console.log(rawInfo)
            console.log(parsedInfo)
            filename = parsedInfo?.profile_picture || filename;
            console.log(filename)
        } catch (e) {
            console.error("Fout bij het parsen van user info:", e);
        }
    }

    const match = profilePictures?.find(p => p.file === filename);
    return match?.src;
}
