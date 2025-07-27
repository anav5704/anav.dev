import path from "node:path";
import fs from "node:fs";

interface Props {
    title: string;
    description: string;
}

const template = ({ title, description }: Props) => {
    const logo = fs.readFileSync(path.join(process.cwd(), "assets/logo.jpg"));

    return {
        type: "div",
        props: {
            tw: "flex flex-col w-[1200px] h-[630px] bg-white text-zinc-600 p-10 items-start justify-center",
            style: { fontFamily: "Geist Sans" },
            children: [
                {
                    type: "div",
                    props: {
                        tw: "flex items-center border border-zinc-300 rounded-full px-3 m-0",
                        children: [
                            {
                                type: "img",
                                props: {
                                    src: logo.buffer,
                                    tw: "rounded-full",
                                    width: 50,
                                    height: 50
                                }
                            },
                            {
                                type: "p",
                                props: {
                                    tw: "text-[30px] px-5",
                                    children: "Anav Chand | www.anav.dev"
                                }
                            }
                        ]
                    }
                },
                {
                    type: "h1",
                    props: {
                        tw: "text-[70px] text-black font-bold leading-none tracking-tighter my-10",
                        style: { fontFamily: "Alice", textWrap: "balance" },
                        children: title
                    }
                },
                {
                    type: "p",
                    props: {
                        tw: "text-[30px] m-0 p-0",
                        style: { textWrap: "balance" },
                        children: description
                    }
                }
            ]
        }
    };
};

export { template };
