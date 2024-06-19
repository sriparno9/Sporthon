import React from "react";
import Card from "../../Card";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sport = () => {
  const { gameId } = useParams();

  // const matchedLink = Links.find((link) => link.id === parseInt(gameId));
  // console.log(matchedLink);
  // console.log(id);
  const navigate = useNavigate();
  const handleClickTeams = () => {
    navigate(`/admin/sport/${gameId}/teams`);
  };
  // console.log(id);
  const handlePointsTable = () => {
    navigate(`/admin/sport/${gameId}/match-decision`);
  };

  const handleMatchHistory = () => {
    navigate(`/admin/sport/${gameId}/match-history`);
  }
  return (
    <div className="w-[50%] m-auto h-screen">
      {/* <h3 className="my-8  font-bold text-3xl text-fourth text-center">
        {matchedLink && matchedLink?.name}
      </h3> */}
      <div class="flex items-center justify-center mt-16">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2">
          <Card
            text="Teams"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzM9wWyHFH0WtME48cSrnc0t0uogsoA8af-mt-gVEXXQ&s"
            handleClick={handleClickTeams}
          />
          <Card
            text="Table"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy2ns9PMLNLBjHG90CMC-_h27PUO2LoFSeh1gFkRu35ohhHEiwIFz10O9AffPDDOWhVRc&usqp=CAU"
            handleClick={handlePointsTable}
          />
          <Card
            text="Final Match results"
            image="data:image/jpeg;base64,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"
            handleClick={handleMatchHistory}
          />
        </div>
      </div>
    </div>
  );
};

export default Sport;
