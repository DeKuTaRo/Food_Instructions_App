import breakfastImage from "../../../images/breakfast.jpg";
import lunchImage from "../../../images/lunch.jpg";
import dinnerImage from "../../../images/dinner.jpg";
import snackImage from "../../../images/snack.webp";
import teatimeImage from "../../../images/teatime.jpg";

const topicDetails = {

  Breakfast: {
    title: "Breakfast",
    description: "A nutritious start to the day, breakfast provides essential energy and nutrients for optimal functioning.",
    benefits: `Energy Boost: Breakfast jumpstarts the body, providing necessary energy.
Promotes Metabolism: A balanced breakfast helps kickstart metabolism for the day.
Enhances Concentration: Nutrients in breakfast contribute to improved focus and concentration.
Balances Blood Sugar: Eating breakfast helps regulate blood sugar levels throughout the day.
Supports Weight Management: A healthy breakfast aids in weight control by reducing overeating later.`,
    mainImage: `${breakfastImage}`,
  },
  Lunch: {
    title: "Lunch",
    description: "Lunch is not just a daily eating routine; it plays a crucial role in maintaining both physical and mental well-being. Choosing a balanced and diverse range of foods during lunchtime can offer numerous benefits for overall health and vitality.",
    benefits: `Energy Boost: Lunch provides essential energy to sustain the body's activities, preventing fatigue.
Maintains Cardiovascular Health: Lunch helps regulate blood sugar levels, supporting cardiovascular health.
Provides Nutrients for Brain Function: Nutrients from lunch contribute to maintaining brain health and improving concentration.
Aids Digestive Processes: Lunch stimulates digestion, reduces evening hunger, and prevents overeating.
Strengthens Immune System: Essential nutrients in lunch contribute to a stronger immune system and overall body resistance.`,
    mainImage: `${lunchImage}`,
  },
  Dinner: {
    title: "Dinner",
    description: "Dinner is a time to replenish nutrients and unwind. A balanced dinner contributes to overall well-being and prepares the body for restful sleep.",
    benefits: `Nutrient Replenishment: Dinner provides essential nutrients for bodily functions and repair.
Supports Sleep: A well-balanced dinner aids in a better night's sleep.
Prevents Overeating: Eating a satisfying dinner helps prevent late-night snacking.
Digestive Aid: Dinner can include foods that aid digestion, promoting a comfortable night.`,
    mainImage: `${dinnerImage}`,
  },
  Snack: {
    title: "Snack",
    description: "Snacking can be a healthy part of the day, providing a quick energy boost and satisfying hunger between meals.",
    benefits: `Quick Energy: Snacks offer a convenient and quick source of energy.
Controls Hunger: Well-timed snacks can help control hunger and prevent overeating during meals.
Nutrient Boost: Healthy snacks provide additional nutrients to support daily requirements.
Mood Enhancement: Certain snacks can positively impact mood and concentration.`,
    mainImage: `${snackImage}`,
  },
  Teatime: {
    title: "Teatime",
    description: "Teatime is a delightful break, offering a moment to relax and enjoy a comforting beverage along with a small treat.",
    benefits: `Relaxation: Teatime provides a calming break, promoting relaxation.
Social Connection: Sharing teatime can strengthen social bonds and connections.
Antioxidant Intake: Teas often contain antioxidants beneficial for health.
Enjoyment: Teatime allows for the enjoyment of flavors and textures.`,
    mainImage: `${teatimeImage}`,
  },
};

export default topicDetails;
