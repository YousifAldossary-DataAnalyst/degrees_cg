import { HoverEffect } from "../ui/card-hover";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Accelerate",
    desc:
      "Optimize your content creation by planning ahead and using templates. Collaborate with others and ask for feedback to improve your work. Regularly check how your content is doing and tweak your approach to stay effective and relevant.",
    link: "/sign-in",
  },
  {
    title: "Cost Effective",
    desc:
      "Save money and streamline your content creation with our all-in-one content generator. Get social media ideas to post, podcast voice, and visual designs at a fraction of the cost of traditional tools. Simplify your workflow and maximize your budget—start creating impactful content today!",
    link: "/sign-in",
  },
  {
    title: "Maximize Revenue",
    desc:
      "Boost your revenue effortlessly with our all-in-one content generator. Create high-impact social media posts, engaging podcast scripts, and eye-catching designs—all from one platform. Save on costs, streamline your content process, and watch your business grow. Start now and turn your creativity into increased profits!",
    link: "/sign-in",
  },
  
];
