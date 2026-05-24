import {
  SentimentSatisfiedAlt,
  SentimentVeryDissatisfied,
  ThumbUp,
} from "@mui/icons-material";
import { LinearProgress } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import "./comment-list.scss";

export default function CommentList({ comments, sentimentOverview }) {
  return (
    <div className="comment-section">
      <div className="comment-list">
        <List sx={{ width: "100%" }}>
          {comments.map((comment) => (
            <div className="list-item-wrapper">
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={comment.authorName}
                    src={comment.authorProfileImageUrl}
                    sx={{ width: 44, height: 44, marginRight: 2 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <div className="primary">
                      <span className="author-name">{comment.authorName}</span>
                      <span className="comment-date">
                        {formatDate(comment.publishedAt)}
                      </span>
                      <span className="sentiment">
                        {SentimentBadge(comment.sentiment)}
                      </span>
                    </div>
                  }
                  secondary={
                    <React.Fragment>
                      <div className="detail-section">
                        <p className="review-content">{comment.content}</p>
                        <div className="like-section">
                          <ThumbUp sx={{ color: "whitesmoke" }} />
                          <p className="like-count">{comment.likeCount}</p>
                        </div>
                      </div>
                      <Divider
                        component="div"
                        sx={{
                          backgroundColor: "InactiveBorder",
                        }}
                      />
                    </React.Fragment>
                  }
                />
              </ListItem>
            </div>
          ))}
        </List>
      </div>

      <div className="overall">
        <div className="total">{sentimentOverview.totalReviews} reviews</div>
        <div className="description">
          {`${Math.round(sentimentOverview.positivePercentage)}% of the ${
            sentimentOverview.totalReviews
          } comments on Youtube are positive`}
        </div>
        <div className="detail">
          <div className="detail-item">
            <div className="label">positive</div>
            <LinearProgress
              color="success"
              value={sentimentOverview.positivePercentage}
              variant="determinate"
              sx={{
                borderRadius: 10,
                backgroundColor: "InactiveBorder",
              }}
            />
            <div className="count">{sentimentOverview.positiveCount}</div>
          </div>
          <div className="detail-item">
            <div className="label">negative</div>
            <LinearProgress
              color="error"
              value={sentimentOverview.negativePercentage}
              variant="determinate"
              sx={{ borderRadius: 10, backgroundColor: "InactiveBorder" }}
            />
            <div className="count">{sentimentOverview.negativeCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function SentimentBadge(sentiment) {
  return sentiment === "positive" ? (
    <SentimentSatisfiedAlt color="success" />
  ) : (
    <SentimentVeryDissatisfied color="error" />
  );
}
