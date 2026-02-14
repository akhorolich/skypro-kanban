import { DragDropContext } from "@hello-pangea/dnd";
import { useState } from "react";
import useTasks from "../context/TaskContext/useTasks";
import styled from "styled-components";

import { loaderMock } from "../shared/mock";

import Column from "../components/Column";
import Card from "../components/Card/Card";
import Loader from "../components/Loader";

import SContainer from "./style/containerStyle";

const SMain = styled.main`
  width: 100%;
  background-color: ${(props) => props.theme.colors.bg};
`;

const SMainBlock = styled.div`
  @media screen and (max-width: 1200px) {
    width: 100%;
    margin: 0 auto;
    padding: 40px 0 64px;
  }

  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;
`;

const SMainContent = styled.div`
  @media screen and (max-width: 1200px) {
    display: block;
  }

  width: 100%;
  display: flex;
`;

export default function Main() {
  const { statuses, filterCards, cards, loading, draggableUpdate, setCards } =
    useTasks();
  const [isShowingDndPlug, setIsShowingDndPlug] = useState(false);

  const reorder = (cards, startIndex, endIndex) => {
    const result = [...cards];
    const [draggableItem] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, draggableItem);
    return result;
  };

  const onBeforeCapture = () => {
    setIsShowingDndPlug(true);
  };

  const onDragEnd = (result) => {
    setIsShowingDndPlug(false);
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      return setCards(reorder(cards, source.index, destination.index));
    }

    const newCardsPosition = reorder(cards, source.index, destination.index);
    const draggedCard = newCardsPosition.find(
      (card) => card._id === draggableId
    );
    draggedCard.status = destination.droppableId;
    setCards(newCardsPosition);
    draggableUpdate(draggableId, draggedCard);
  };

  return (
    <SMain>
      <SContainer>
        <SMainBlock>
          <SMainContent>
            <DragDropContext
              onDragEnd={onDragEnd}
              onBeforeCapture={onBeforeCapture}
            >
              {cards.length === 0 && !loading ? (
                <div style={{ width: "100%" }}>
                  <p
                    style={{
                      color: "#565EEF",
                      fontSize: "1.5em",
                      textAlign: "center",
                    }}
                  >
                    Новых задач нет...
                  </p>
                </div>
              ) : (
                statuses.map((status) => (
                  <Column key={status} status={status}>
                    {loading
                      ? loaderMock(Loader, 4)
                      : filterCards(Card, status, cards)}
                    {isShowingDndPlug ? (
                      <svg
                        width="222"
                        height="132"
                        viewBox="0 0 222 132"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 17C1 11.3995 1 8.59921 2.08993 6.46009C3.04867 4.57847 4.57847 3.04867 6.46009 2.08993C8.59921 1 11.3995 1 17 1H205C210.601 1 213.401 1 215.54 2.08993C217.422 3.04867 218.951 4.57847 219.91 6.46009C221 8.59921 221 11.3995 221 17V115C221 120.601 221 123.401 219.91 125.54C218.951 127.422 217.422 128.951 215.54 129.91C213.401 131 210.601 131 205 131H17C11.3995 131 8.59921 131 6.46009 129.91C4.57847 128.951 3.04867 127.422 2.08993 125.54C1 123.401 1 120.601 1 115V17Z"
                          stroke="#94A6BE"
                          strokeDasharray="6 4"
                        />
                      </svg>
                    ) : null}
                  </Column>
                ))
              )}
            </DragDropContext>
          </SMainContent>
        </SMainBlock>
      </SContainer>
    </SMain>
  );
}
