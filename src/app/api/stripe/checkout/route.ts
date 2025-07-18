import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_IDS: Record<string, string> = {
  basica: "price_1RluQjLdLTwfmYmyUK43UAj2",
  pro: "price_1RluSDLdLTwfmYmycMRtrhTa",
};

export async function POST(req: NextRequest) {
  const { plan, producto, email } = await req.json();
  const priceId = PRICE_IDS[plan];
  if (!priceId || !producto) {
    return NextResponse.json({ error: "Plan o producto inválido" }, { status: 400 });
  }
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email,
      success_url: `${req.nextUrl.origin}/descarga?producto=${encodeURIComponent(producto)}&plan=${encodeURIComponent(plan)}`,
      cancel_url: `${req.nextUrl.origin}/cancelado`,
      billing_address_collection: "auto",
      allow_promotion_codes: true,
    });
    return NextResponse.json({ url: session.url });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
} 