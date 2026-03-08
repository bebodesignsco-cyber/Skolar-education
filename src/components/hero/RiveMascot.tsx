"use client";

import React from "react";
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from "@rive-app/react-canvas";

interface RiveMascotProps {
  src?: string;
  stateMachine?: string;
  artboard?: string;
  animations?: string | string[];
  className?: string;
}

export const RiveMascot: React.FC<RiveMascotProps> = ({
  src = "/animations/octopus.riv",
  stateMachine = "octopus",
  artboard,
  animations,
  className,
}) => {
  const { rive, RiveComponent } = useRive({
    src,
    stateMachines: stateMachine,
    artboard,
    animations,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  const summonInput = useStateMachineInput(rive, stateMachine, "Summon");
  const thinkingInput = useStateMachineInput(rive, stateMachine, "Thinking");
  const idlingInput = useStateMachineInput(rive, stateMachine, "Idling");

  React.useEffect(() => {
    if (summonInput) {
      summonInput.fire();
    }
  }, [summonInput]);

  const handleClick = () => {
    if (thinkingInput && idlingInput) {
      thinkingInput.fire();
      
      // Reset to idling after 3 seconds
      setTimeout(() => {
        idlingInput.fire();
      }, 3000);
    }
  };

  return (
    <div className={`${className} cursor-pointer`} onClick={handleClick}>
      <RiveComponent />
    </div>
  );
};
