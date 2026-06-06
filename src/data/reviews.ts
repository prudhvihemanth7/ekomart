/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Review } from '../types';

export const reviews: Review[] = [
  {
    id: 'r1',
    productId: '1',
    userName: 'Alex Johnson',
    rating: 5,
    comment: 'Best headphones I have ever owned. The noise cancellation is unreal!',
    date: '2024-05-15',
    userAvatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=random',
  },
  {
    id: 'r2',
    productId: '2',
    userName: 'Sarah Miller',
    rating: 4,
    comment: 'Great watch, really helps track my sleep and workouts. Battery lives about 2 days.',
    date: '2024-05-10',
    userAvatar: 'https://ui-avatars.com/api/?name=Sarah+Miller&background=random',
  },
  {
    id: 'r3',
    productId: '3',
    userName: 'David Chen',
    rating: 5,
    comment: 'This coffee maker transformed my mornings. The frother is super easy to use.',
    date: '2024-05-02',
    userAvatar: 'https://ui-avatars.com/api/?name=David+Chen&background=random',
  },
  {
    id: 'r4',
    productId: '1',
    userName: 'Emily Davis',
    rating: 5,
    comment: 'So comfortable for long flights. Definitely worth the price.',
    date: '2024-04-28',
    userAvatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=random',
  },
  {
    id: 'r5',
    productId: '11',
    userName: 'Jessica Taylor',
    rating: 5,
    comment: 'My skin has never looked better. Highly recommend this serum!',
    date: '2024-05-20',
    userAvatar: 'https://ui-avatars.com/api/?name=Jessica+Taylor&background=random',
  },
];
