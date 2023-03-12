import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import MoodIcon from "@mui/icons-material/Mood";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MicOffIcon from "@mui/icons-material/MicOff";
import uniqolor from "uniqolor";
import DoneIcon from "@mui/icons-material/Done";
import RandomLine from "@/components/RandomLine";

export default function Home() {
	const {
		query: { roomId },
	} = useRouter();
	const [fakeData, setFakeData] = useState([
		{
			name: "Pratham",
			color: uniqolor.random({ lightness: 80 }),
		},
		{
			name: "Mihir",
			color: uniqolor.random({ lightness: 80 }),
		},
		{
			name: "Rajesh",
			color: uniqolor.random({ lightness: 80 }),
		},
		{
			name: "Shilpa",
			color: uniqolor.random({ lightness: 80 }),
		},
	]);
	const [chatUnread, setChatUnread] = useState(false);
	const [micOn, setMicOn] = useState(true);
	const [copied, setCopied] = useState(false);

	useEffect(()=>{
		fetch("https://answer-bot.vercel.app/randomLine").then(async(res) => {
			console.log(await res.json());
		})
	}, [])

	useEffect(() => {
		window.addEventListener("keydown", (e) => {
			// toggle mic m is pressed
			if (e.key === "m" || e.key === "M") {
				setMicOn(!micOn);
			}
			// toggle chat if c is pressed
			if (e.key === "c" || e.key === "C") {
				setChatUnread(!chatUnread);
			}
		});
	});

	

	return (
		<>
			<Head>
				<title>Room-{roomId}</title>
			</Head>
			<main className={styles.body}>
				<header className={styles.header}>
					<h3
						className={styles.roomId}
						onClick={() => {
							navigator.clipboard.writeText(roomId + "");
							setCopied(true);
							setTimeout(() => {
								setCopied(false);
							}, 1000);
						}}
					>
						{roomId} {copied ? <DoneIcon /> : <ContentCopyIcon />}{" "}
					</h3>
					<select className={styles.type}>
						<option className={styles.type} defaultChecked>
							Normal
						</option>
						<option className={styles.type} defaultChecked>
							Ubnormal
						</option>
						<option className={styles.type} defaultChecked>
							difficult
						</option>
					</select>
				</header>
				<RandomLine />
				<footer className={styles.footer}>
					<div className={styles.participants}>
						{fakeData?.map((item, index) => {
							return (
								<div key={index} className={styles.participant}>
									<div
										className={styles.participantname}
										style={{
											backgroundColor: item.color.color,
										}}
									>
										{item.name[0].toUpperCase()}
									</div>
									<div className={styles.participanthover}>
										{item.name}
									</div>
								</div>
							);
						})}
						{
							<div className={styles.participant}>
								<div
									className={styles.participantname}
									style={{
										backgroundColor: "var(--secondary-clr)",
										color: "var(--primary-clr)",
									}}
								>
									{"+" + fakeData.length}
								</div>
							</div>
						}
					</div>
					<div className={styles.micchat}>
						<div
							className={styles.mic}
							onClick={() => setMicOn(!micOn)}
						>
							{micOn ? <MicIcon /> : <MicOffIcon />}
						</div>
						<div
							className={styles.chat}
							onClick={() => setChatUnread(!chatUnread)}
						>
							{" "}
							{chatUnread ? (
								<ChatBubbleIcon />
							) : (
								<MarkChatUnreadIcon />
							)}{" "}
						</div>
					</div>
					<div className={styles.emojies}>
						{" "}
						<MoodIcon />{" "}
					</div>
				</footer>
			</main>
		</>
	);
}
