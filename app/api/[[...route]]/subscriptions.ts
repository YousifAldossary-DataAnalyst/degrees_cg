// import Stripe from "stripe";
// import { Hono } from "hono";
// import { eq } from "drizzle-orm";
// import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

// import { checkIsActive } from "@/features/subscriptions/lib";

// import { stripe } from "@/lib/stripe";
// import { subscriptions } from "@/db/schema";
// import { useUser } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/db/db";

// const app = new Hono()
//   .post("/billing", clerkMiddleware(), async (c) => {
//     const auth = getAuth(c);

//     if (!auth?.userId) {
//       return c.json({ error: "Unauthorized" }, 401);
//     }

//     const [subscription] = await db
//       .select()
//       .from(subscriptions)
//       .where(eq(subscriptions.userId, auth.userId));

//     if (!subscription) {
//       return c.json({ error: "No subscription found" }, 404);
//     }

//     const session = await stripe.billingPortal.sessions.create({
//       customer: subscription.customerId,
//       return_url: `${process.env.NEXT_PUBLIC_URL}`,
//     });

//     if (!session.url) {
//       return c.json({ error: "Failed to create session" }, 400);
//     }

//     return c.json({ data: session.url });
//   })
//   .get("/current", clerkMiddleware(), async (c) => {
//     const auth = getAuth(c);

//     if (!auth?.userId) {
//       return c.json({ error: "Unauthorized" }, 401);
//     }

//     const [subscription] = await db
//       .select()
//       .from(subscriptions)
//       .where(eq(subscriptions.userId, auth.userId));

//     const active = checkIsActive(subscription);

//     return c.json({
//       data: {
//         ...subscription,
//         active,
//       },
//     });
//   })
//   .post("/checkout", clerkMiddleware(), async (c) => {
//     const user = await currentUser();
//     const auth = getAuth(c);

//     if (!auth?.userId) {
//       return c.json({ error: "Unauthorized" }, 401);
//     }

//     const session = await stripe.checkout.sessions.create({
//       success_url: `${process.env.NEXT_PUBLIC_URL}?success=1`,
//       cancel_url: `${process.env.NEXT_PUBLIC_URL}?canceled=1`,
//       payment_method_types: ["card", "paypal"],
//       mode: "subscription",
//       billing_address_collection: "auto",
//       customer_email: user?.emailAddresses[0].emailAddress || "",
//       line_items: [
//         {
//           price: process.env.STRIPE_PRICE_ID,
//           quantity: 1,
//         },
//       ],
//       metadata: {
//         userId: auth?.userId,
//       },
//     });

//     const url = session.url;

//     if (!url) {
//       return c.json({ error: "Failed to create session" }, 400);
//     }

//     return c.json({ data: url });
//   })
//   .post("/webhook", async (c) => {
//     const body = await c.req.text();
//     const signature = c.req.header("Stripe-Signature") as string;

//     let event: Stripe.Event;

//     try {
//       event = stripe.webhooks.constructEvent(
//         body,
//         signature,
//         process.env.STRIPE_WEBHOOK_SECRET!
//       );
//     } catch (error) {
//       return c.json({ error: "Invalid signature" }, 400);
//     }

//     const session = event.data.object as Stripe.Checkout.Session;

//     if (event.type === "checkout.session.completed") {
//       const subscription = await stripe.subscriptions.retrieve(
//         session.subscription as string
//       );

//       if (!session?.metadata?.userId) {
//         return c.json({ error: "Invalid session" }, 400);
//       }

//       await db.insert(subscriptions).values({
//         status: subscription.status,
//         userId: session.metadata.userId,
//         subscriptionId: subscription.id,
//         customerId: subscription.customer as string,
//         priceId: subscription.items.data[0].price.product as string,
//         currentPeriodEnd: new Date(subscription.current_period_end * 1000),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       });
//     }

//     if (event.type === "invoice.payment_succeeded") {
//       const subscription = await stripe.subscriptions.retrieve(
//         session.subscription as string
//       );

//       if (!session?.metadata?.userId) {
//         return c.json({ error: "Invalid session" }, 400);
//       }

//       await db
//         .update(subscriptions)
//         .set({
//           status: subscription.status,
//           currentPeriodEnd: new Date(subscription.current_period_end * 1000),
//           updatedAt: new Date(),
//         })
//         .where(eq(subscriptions.id, subscription.id));
//     }

//     return c.json(null, 200);
//   });

// export default app;
