import { ComponentInteraction } from "eris";
import { Paginator } from "../LumDux/Paginator";
export default {
  name: "prev_embed_help",
  run: async (Interaction: ComponentInteraction) => {
    const getHelpRow = () => {};
    let helpPaginator = new Paginator(3, [{}]);
  },
};
