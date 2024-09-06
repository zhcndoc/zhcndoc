export interface RepositoryType {
  name: string;
  type: "translate" | "mirror";
  origin: string;
  origin_branch: string;
  upstream: string;
  upstream_branch: string;
}
