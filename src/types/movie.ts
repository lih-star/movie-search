import { z } from "zod";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  overview: z.string(),
  vote_average: z.number(),
  release_date: z.string().optional(),
});

export const MovieListSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
  results: z.array(MovieSchema),
});

export type Movie = z.infer<typeof MovieSchema>;