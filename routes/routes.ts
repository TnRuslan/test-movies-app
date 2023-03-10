function path(root: string, sublink: string): string {
  return `${root}${sublink}`;
}
const ROOT = "/";
export const PATH_PAGE = {
  root: ROOT,
  film: (id: string) => path(ROOT, `${id}`),
};
