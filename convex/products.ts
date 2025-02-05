import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createProduct = mutation({
  args: { productName: v.string() },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("you are not logged in");
    }
    await ctx.db.insert("products", {
      productName: args.productName,
    });
  },
});

export const getProducts = query({
  args: {},
  async handler(ctx) {
    // const identity = await ctx.auth.getUserIdentity();
    // console.log(identity?.tokenIdentifier);
    // if (!identity) {
    //   return [];
    // }
    return ctx.db.query("products").collect();
  },
});
