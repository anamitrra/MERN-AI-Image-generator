import React, { useState } from "react";
import { Card, FormField, Loader } from "../components";

function Home() {
  const [loading, setLoading] = useState(false);
  const [allpost, setAllpost] = useState(null);
  const [searchText, setsearchText] = useState("");

  const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return data.map((post) => {
        <Card key={post.id} {...post} />;
      });
    } else {
      return (
        <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">
          {title}
        </h2>
      );
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-semibold font-mono  text-[#222328] text-[32px]">
          Community Showcase
        </h1>
        <p></p>

        <div className="mt-16">
          <FormField />
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {/*  <></> in needed to evaluate 2nd conditon, searchText && means if searchtext is not empty*/}
              {searchText && (
                <h2 className="font-medium text-[#666e75] text-xl mb-3">
                  Showing Results for{" "}
                  <span className="text-[#222328]">{searchText}</span>
                </h2>
              )}
            </>
          )}

          <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-2">
            {searchText ? (
              <RenderCards data={[]} title={"No search results found"} />
            ) : (
              <RenderCards data={[]} title={"No posts found"} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;