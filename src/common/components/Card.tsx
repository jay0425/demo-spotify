import { styled, Typography } from "@mui/material";
import PlayButton from "./ui/PlayButton";

// 앨범, 플레이리스트, 아티스트 등 여러 섹션에서 같이 쓰는 카드.
// 한 줄에 몇 개를 보여줄지는 카드가 아니라 쓰는 쪽(Grid)에서 정한다.
export interface CardProps {
	/** 카드 이미지 주소. 없으면 빈 회색 박스가 나온다 */
	image?: string;
	/** 큰 글씨 (앨범명, 플레이리스트명 등) */
	title: string;
	/** 작은 글씨 (아티스트명, 설명 등) */
	subtitle?: string;
	/** 재생 버튼을 눌렀을 때 실행할 함수 */
	onPlay?: () => void;
}

// 재생 버튼을 감싸는 div 의 클래스. 카드에 마우스를 올렸을 때 이 클래스를 찾아서 보이게 한다.
const PLAY_BUTTON_CLASS = "card-play-button";

const CardContainer = styled("div")(({ theme }) => ({
	padding: "12px",
	borderRadius: "8px",
	transition: "background-color 0.2s",
	"&:hover": {
		backgroundColor: theme.palette.action.hover,
	},
	// 마우스를 올리거나, 키보드(Tab)로 재생 버튼에 포커스하면 재생 버튼이 올라온다.
	[`&:hover .${PLAY_BUTTON_CLASS}, &:focus-within .${PLAY_BUTTON_CLASS}`]: {
		opacity: 1,
		transform: "translateY(0)",
	},
}));

// 재생 버튼을 이미지 위에 띄우려고 기준점(position: relative)을 만든다.
const ImageBox = styled("div")({
	position: "relative",
	marginBottom: "8px",
});

const CardImage = styled("img")({
	display: "block",
	width: "100%",
	aspectRatio: "1 / 1", // 이미지 비율이 달라도 정사각형으로 맞춘다
	objectFit: "cover",
	borderRadius: "6px",
});

const ImagePlaceholder = styled("div")(({ theme }) => ({
	width: "100%",
	aspectRatio: "1 / 1",
	borderRadius: "6px",
	backgroundColor: theme.palette.action.active,
}));

const PlayButtonWrapper = styled("div")({
	position: "absolute",
	right: "8px",
	bottom: "8px",
	opacity: 0,
	transform: "translateY(8px)",
	transition: "opacity 0.2s, transform 0.2s",
	// 터치 기기는 마우스를 올릴 수 없어서 항상 보여준다.
	"@media (hover: none)": {
		opacity: 1,
		transform: "none",
	},
});

const Card = ({ image, title, subtitle, onPlay }: CardProps) => {
	return (
		<CardContainer>
			<ImageBox>
				{image ? <CardImage src={image} alt={title} /> : <ImagePlaceholder />}
				<PlayButtonWrapper className={PLAY_BUTTON_CLASS}>
					<PlayButton onClick={onPlay} />
				</PlayButtonWrapper>
			</ImageBox>
			{/* noWrap : 글자가 길면 한 줄에서 ... 으로 자른다 */}
			<Typography noWrap sx={{ fontWeight: 700 }}>
				{title}
			</Typography>
			{subtitle && (
				<Typography noWrap variant="body1" color="text.secondary">
					{subtitle}
				</Typography>
			)}
		</CardContainer>
	);
};

export default Card;
