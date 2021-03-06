import React from "react";
import { Route } from "react-router-dom";
import { CategoryProvider } from "./categories/CategoryProvider";
import { CategoryList } from "./categories/CategoryList";
import { CategoryForm } from "./categories/CategoryForm";
import { CategoryDetails } from "./categories/CategoryDetails"
import { PostProvider } from "./posts/PostProvider";
import { TagProvider } from "./tags/TagsProvider";
import { TagList } from "./tags/TagList";
import { TagManagement } from "./tags/TagManagement";
import { TagForm } from "./tags/TagForm";
import { PostList } from "./posts/PostList";
import { PostForm } from "./posts/PostForm";
import { PostDetail } from "./posts/PostDetail";
import { CommentProvider } from "./comments/CommentProvider";
import { CommentList } from "./comments/CommentList";
import { CommentForm } from "./comments/CommentForm";
import { CommentDetail } from "./comments/CommentDetail";
import { ProfileList } from "./profiles/ProfileList"
import { ProfileProvider } from "./profiles/ProfileProvider"
import {HomePage} from "./HomePage";

export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      ></main>

      {/* Comment Area   <Route exact path="/posts/:postId(\d+)/createcomment"> */}

      {/* Category Area    */}
      <CategoryProvider>

        <Route exact path="/categories">
          <CategoryList />
        </Route>
        <Route
          path="/categories/:categoryId(\d+)"
          render={(props) => <CategoryDetails {...props} />}
        />
        <Route
          exact
          path="/categories/new"
          render={(props) => {
            return <CategoryForm {...props} />;
          }}
        />
        <Route
          path="/categories/edit/:categoryId(\d+)"
          render={(props) => <CategoryForm {...props} />}
        />
      </CategoryProvider>

      {/* Post Area    */}

      <PostProvider>
        <CategoryProvider>
          <TagProvider>
            <CommentProvider>
              <Route exact path="/posts">
                <PostList />
              </Route>

              <Route exact path="/posts/create">
                <PostForm />
              </Route>

              <Route exact path="/posts/edit/:postId(\d+)">
                <PostForm />
              </Route>

              <Route exact path="/posts/detail/:postId(\d+)">
                <PostDetail />
              </Route>
              <Route exact path="/comments">
                <CommentList />
              </Route>
              <ProfileProvider>
              <Route exact path="/">
                <HomePage/>
              </Route>
              </ProfileProvider>
              <Route exact path="/posts/:postId(\d+)/createcomment">
                <CommentForm />
              </Route>

              <Route path="/comments/edit/:commentId(\d+)">
                <CommentForm />
              </Route>
              {/* <Route path="/comments/details/${comment.id}">
            <CommentDetail />
          </Route> */}
            </CommentProvider>
          </TagProvider>
        </CategoryProvider>
      </PostProvider>

      {/* Tag Area    */}
      <TagProvider>
        <PostProvider>
          <Route exact path="/tags/:postId(\d+)">
            <TagList />
          </Route>
          <Route exact path="/tags">
            <TagManagement />
          </Route>
          <Route exact path="/tags/edit/:tagId(\d+)">
            <TagForm />
          </Route>
          <Route exact path="/tags/create">
            <TagForm />
          </Route>
        </PostProvider>
      </TagProvider>

      <ProfileProvider>
        <Route exact path="/profiles">
          <ProfileList />
        </Route>
      </ProfileProvider>
    </>
  );
};

