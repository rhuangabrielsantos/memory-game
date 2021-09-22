import Rain from "../../assets/rain.png";
import Sun from "../../assets/sun.png";
import Coke from "../../assets/coke.png";
import Fries from "../../assets/fries.png";
import Hamburger from "../../assets/hamburger.png";
import Pizza from "../../assets/pizza.png";
import Sleeping from "../../assets/sleeping.png";
import Smile from "../../assets/smile.png";
import HotDog from "../../assets/hot-dog.png";
import Baguette from "../../assets/baguette.png";
import Lion from "../../assets/lion.png";
import Dog from "../../assets/dog.png";
import Pig from "../../assets/pig.png";
import Fox from "../../assets/fox.png";
import Bee from "../../assets/bee.png";
import Penguin from "../../assets/penguin.png";
import Chicken from "../../assets/chicken.png";
import Elephant from "../../assets/elephant.png";
import Hippo from "../../assets/hippo.png";
import Owl from "../../assets/owl.png";
import Snake from "../../assets/snake.png";
import Toucan from "../../assets/toucan.png";
import Crawl from "../../assets/crawl.png";
import Fish from "../../assets/fish.png";
import Snail from "../../assets/snail.png";

import ArrayUtils from "../actions/arrayUtils";

export function createArrayCards(size) {
  const cards = [];
  const uniqueCards = size / 2;
  let cardsImages = [
    Rain,
    Sun,
    Coke,
    Fries,
    Hamburger,
    Pizza,
    Sleeping,
    Smile,
    HotDog,
    Baguette,
    Lion,
    Dog,
    Pig,
    Fox,
    Bee,
    Penguin,
    Chicken,
    Elephant,
    Hippo,
    Owl,
    Snake,
    Toucan,
    Crawl,
    Fish,
    Snail,
  ];

  let id = 1;

  for (let i = 0; i < uniqueCards; i++) {
    const image = cardsImages.shift();

    cards.push({
      id: id,
      img: image,
      isOpen: false,
      matchId: id + 1,
      alreadyMatched: false,
    });

    cards.push({
      id: id + 1,
      img: image,
      isOpen: false,
      matchId: id,
      alreadyMatched: false,
    });

    id += 2;

    cardsImages = ArrayUtils.shuffle(cardsImages);
  }

  return ArrayUtils.shuffle(cards);
}
