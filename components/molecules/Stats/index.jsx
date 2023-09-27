"use client";

import { useState } from "react";

import { TypesBox } from "@/components/atoms";

const Stats = ({statsRes, balancesRes, yearSelected}) => {

  const [type, setType] = useState('month');

  return (
  <div>
    <TypesBox {...{ type, setType }} />
  </div>
  );
};

export default Stats;
