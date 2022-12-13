import React from "react";

import { Scenario } from "./Main";

interface Props extends Scenario {}

const ScenarioRow = (props: Props) => {
  const Checkboxes = () => {
    let counter = props.fulfilled;
    const array = [];
    for (let i = 0; i < props.requirement; i++) {
      const element = {
        number: props,
        live: false,
        checked: false,
      };

      if (i < props.live_requirement) {
        element.live = true;
        if (i < props.live_fulfilled) {
          element.checked = true;
        }
      } else {
        if (
          (props.live_requirement === 0 && counter > 0) ||
          counter - props.live_fulfilled > 0
        ) {
          element.checked = true;
          counter -= 1;
        }
      }
      array.push(element);
    }

    return (
      <>
        {array.map((element, index) => {
          return (
            <svg
              key={index}
              width="20"
              height="20"
              fill="rgb(var(--lightGrey))"
            >
              <path d="m 2 2 h 16 v 16 h -16 z" />
              {element.live && (
                <path
                  d="m 2 2 h 16 v 16 h -16 z"
                  fill="transparent"
                  stroke="rgb(var(--black))"
                />
              )}
              {element.checked && (
                <path
                  d="m 1 13 l 7 7 l 9 -20"
                  fill="transparent"
                  stroke="rgb(var(--black))"
                />
              )}
            </svg>
          );
        })}
      </>
    );
  };

  return (
    <div className="row">
      <p className="scenario-checklist__label">{props.scenario_number}.</p>
      <div className="flex row justify-sa">
        <Checkboxes />
      </div>
    </div>
  );
};

export default ScenarioRow;
