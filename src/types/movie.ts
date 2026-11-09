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

export const MovieDetailSchema = z.object({
  id: z.number(),
  title: z.string(),
  tagline: z.string().nullable().optional(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: z.string(),
  runtime: z.number().nullable(),
  vote_average: z.number(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
});

export type Movie = z.infer<typeof MovieSchema>;
export type MovieDetail = z.infer<typeof MovieDetailSchema>;