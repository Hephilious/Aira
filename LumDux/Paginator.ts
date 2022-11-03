import { ArrowFunction } from "typescript";

export class Paginator {
  pages = ({} = {} as { [key: string]: number });
  prevEmbedID: string;
  nextEmbedID: string;
  numberOfPages;
  embeds: Array<object>;
  currentPage: number = 0;
  currentEmbed: object;
  getRow = (id: string) => {
    let row: Object = {
      components: [
        {
          type: 1,
          components: [
            {
              custom_id: this.prevEmbedID,
              type: 2,
              style: 3,
              label: "Prev",
              disabled: this.currentPage === 0,
            },
            {
              custom_id: this.nextEmbedID,
              type: 2,
              style: 3,
              label: "Next",
              disabled: this.currentPage === this.numberOfPages - 1,
            },
          ],
        },
      ],
      embed: this.embeds[id],
      flags: 64,
    };

    return row;
  };

  constructor(
    numOfPages: Number,
    embeds: Array<object>,
    prevEmbedID: string,
    nextEmbedID: string
  ) {
    this.numberOfPages = numOfPages;
    this.embeds = embeds;
    this.prevEmbedID = prevEmbedID;
    this.nextEmbedID = nextEmbedID;
  }
}
