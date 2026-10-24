import { Grid, Typography } from "@mui/material";

interface Cardprops {
	name: string;
	image: string;
	artistName: string | undefined;
}

const Card = ({ image, name, artistName }: Cardprops) => {
	return (
		// Grid container 의 바로 아래 자식이어야 size 가 적용돼서 div 로 감싸지 않는다.
		<Grid size={{ xs: 6, sm: 4, md: 2 }}>
			<img src={image} alt={name} style={{ width: "100%" }} />
			<Typography>{name}</Typography>
			<Typography>{artistName}</Typography>
		</Grid>
	);
};

export default Card;
