/*
 *  Beachy Beachy Ball
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 *
 *  ATTENTION! FREE SOFTWARE
 *  This website is free software (free as in freedom).
 *  If you use any part of this code, you must make your entire project's source code
 *  publicly available under the same license. This applies whether you modify the code
 *  or use it as it is in your own project. This ensures that all modifications and
 *  derivative works remain free software, so that everyone can benefit.
 *  If you are not willing to comply with these terms, you must refrain from using any part of this code.
 *
 *  For full license terms and conditions, you can read the AGPL-3.0 here:
 *  https://www.gnu.org/licenses/agpl-3.0.html
 */

import {
  BlockEmpty,
  BlockSpinner,
  BlockDoubleSpinner,
  BlockLimbo,
  BlockDoubleLimbo,
  BlockSlidingWall,
  BlockDoubleSlidingWall,
} from './Blocks.jsx';

const levels = [
  {
    name: 'Copacabana',
    difficulty: 1,
    blocks: [
      // 19
      BlockEmpty,
      BlockEmpty,
      BlockSpinner,
      BlockEmpty,
      BlockEmpty,
      BlockSlidingWall,
      BlockEmpty,
      BlockEmpty,
      BlockLimbo,
      BlockEmpty,
      BlockEmpty,
      BlockDoubleSpinner,
      BlockEmpty,
      BlockEmpty,
      BlockDoubleLimbo,
      BlockEmpty,
      BlockEmpty,
      BlockDoubleSlidingWall,
      BlockEmpty,
    ],
  },
  {
    name: 'Santa Monica',
    difficulty: 1,
    blocks: [
      // 34
      BlockEmpty,
      BlockEmpty,
      BlockSpinner,
      BlockDoubleSpinner,
      BlockEmpty,
      BlockSlidingWall,
      BlockDoubleSlidingWall,
      BlockEmpty,
      BlockLimbo,
      BlockDoubleLimbo,
      BlockEmpty,
      BlockEmpty,
      BlockDoubleSpinner,
      BlockDoubleSpinner,
      BlockDoubleSlidingWall,
      BlockDoubleSlidingWall,
      BlockDoubleLimbo,
      BlockDoubleLimbo,
      BlockDoubleSpinner,
      BlockDoubleSlidingWall,
      BlockDoubleLimbo,
      BlockDoubleSpinner,
      BlockDoubleSpinner,
      BlockDoubleSpinner,
      BlockDoubleSlidingWall,
      BlockDoubleSlidingWall,
      BlockDoubleSlidingWall,
      BlockDoubleLimbo,
      BlockDoubleLimbo,
      BlockDoubleLimbo,
      BlockDoubleSpinner,
      BlockDoubleSlidingWall,
      BlockDoubleLimbo,
      BlockEmpty,
    ],
  },
];

levels.forEach((level) => {
  level.count = level.blocks.length;
});

export default levels;
