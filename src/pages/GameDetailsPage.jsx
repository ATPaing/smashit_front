import { useParams } from "react-router-dom";

const GameDetailsPage = () => {
    const { gameId } = useParams();

    console.log(gameId);

    return <div>Game ID: {gameId}</div>;
};

export default GameDetailsPage;
