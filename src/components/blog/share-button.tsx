
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, } from "react-share";
import IconFB from "@/images/icon/icon-fb-2.inline.svg";
import IconTwitter from "@/images/icon/icon-twitter-2.inline.svg";
import IconLinkedin from "@/images/icon/icon-linkedin-2.inline.svg";

const ShareButton = ({ url, title }: { url: string, title: string }) => {
    return (
        <div className='flex gap-[0.688rem]'>
            <FacebookShareButton url={url}>
                <IconFB />
            </FacebookShareButton>
            <TwitterShareButton url={url} title={title}>
                <IconTwitter />
            </TwitterShareButton>
            <LinkedinShareButton url={url} title={title}>
                <IconLinkedin />
            </LinkedinShareButton>
        </div>
    )
}
export default ShareButton