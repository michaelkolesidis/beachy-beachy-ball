// Beachy Beachy Ball
// Copyright (c) 2023 Michael Kolesidis (michael.kolesidis@gmail.com)
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import {
  blockDimensions,
  BlockEmpty,
  BlockSpinner,
  BlockDoubleSpinner,
  BlockLimbo,
  BlockDoubleLimbo,
  BlockSlidingWall,
  BlockDoubleSlidingWall,
  BlockEnd,
} from "./Blocks.jsx";

const levels = [
  {
    name: "Copacabana",
    count: 2,
    blocks: [BlockEmpty, BlockSpinner],
  },
  {
    name: "Santa Monica",
    count: 4,
    blocks: [BlockEmpty, BlockSpinner, BlockEmpty, BlockSlidingWall],
  },
];

export default levels;
