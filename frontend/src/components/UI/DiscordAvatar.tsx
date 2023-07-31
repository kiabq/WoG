// Libraries
import Image from "next/image"

export default function DiscordAvatar(
    { 
        src, width, height, classes, id
    } : { 
        src: string, width: number, height: number, classes?: string, id: string
    }) {
        function loader(): string {
            if (src.split('.')[0] === "null") {
                return "https://cdn.discordapp.com/embed/avatars/0.png";
            }

            return `https://cdn.discordapp.com/avatars/${id}/${src}`;
        }

        return (
            <Image
                loader={loader}
                src={src}
                alt='User&apos;s profile picture'
                width={width}
                height={height}
                className={classes}
            />
        )
}