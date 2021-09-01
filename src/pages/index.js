import * as React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import { BiLike } from "@react-icons/all-files/bi/BiLike"
import { BiDislike } from "@react-icons/all-files/bi/BiDislike"
import { BiComment } from "@react-icons/all-files/bi/BiComment"
import { BiShare } from "@react-icons/all-files/bi/BiShare"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogHeaderTitle = styled.h1`
  text-align: center;
  color: #ef233c;
`
const BlogsCountContainer = styled.h4`
  text-align: center;
  padding: 10px;
  border: 2px solid #ef233c;
  max-width: 115px;
  color: #d90429;
  font-size: 22px;
`

const BlogsCount = styled.span`
  color: #ef233c;
  padding: 10px;
  font-size: 18px;
`

const BlogLink = styled(Link)`
  text-decoration: none;
`

const PostContainer = styled.div`
  padding: 20px 10px 0 10px;
  border: 2px solid #ef233c;
  margin-bottom: 20px;
  border-radius: 10px;
`

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color: #01497c;
`
const BlogTime = styled.span`
  float: right;
  font-size: medium;
  color: #8d99ae;
`

const BlogContent = styled.p`
  color: #2b2d42;
  font-size: medium;
  padding-bottom: 20px;
  border-bottom: 0.1em solid #2b2d42;
`

const PostReaction = styled.ul`
  color: #2b2d42;
  font-size: medium;
  text-align: center;
  li {
    display: inline;
    font-size: 32px;
    padding-right: 100px;
    color: #8d99ae;
    transition: all 0.2s ease-in-out;
    &:last-child {
      padding-right: 0;
    }
    &:hover {
      transform: scale(2);
      color: #2b2d42;
    }
  }
`

const IndexPage = ({ data }) => {
  console.log(data, 100)
  return (
    <Layout>
      <Seo title="Home" />
      <div>
        <BlogHeaderTitle>Ahmed's Thoughts</BlogHeaderTitle>
        <BlogsCountContainer>
          {data.allMarkdownRemark.totalCount} <BlogsCount>Posts</BlogsCount>
        </BlogsCountContainer>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <PostContainer key={node.id}>
            <BlogLink to={node.fields.slug}>
              <BlogTitle>
                {node.frontmatter.title}
                <BlogTime>{node.frontmatter.date}</BlogTime>
              </BlogTitle>
            </BlogLink>

            <BlogContent>{node.excerpt}</BlogContent>
            <PostReaction>
              <li>
                <BiLike />
              </li>
              <li>
                <BiDislike />
              </li>
              <li>
                <BiComment />
              </li>
              <li>
                <BiShare />
              </li>
            </PostReaction>
          </PostContainer>
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            description
            title
            date
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
