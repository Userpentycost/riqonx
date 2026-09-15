import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    youtubeChannelId: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
    description: String,
    thumbnail: String,
    subscriberCount: Number,
    videoCount: Number,
    viewCount: Number,
    category: String,
    
    metrics: {
      avgViewsPerVideo: Number,
      avgEngagementRate: Number,
      growthRate: Number,
      averageVideoLength: Number,
      uploadFrequency: String,
    },
    
    topTopics: [String],
    commonKeywords: [String],
    thumbnailPatterns: {
      dominantColors: [String],
      commonElements: [String],
    },
    
    hooks: [{
      type: String,
      frequency: Number,
      effectiveness: Number,
    }],
    
    averageRetention: Number,
    retentionCurve: [{ timestamp: Number, retention: Number }],
    pacingPatterns: [{
      segment: String,
      duration: Number,
      engagementLevel: String,
    }],
    
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
    lastAnalyzedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model('Channel', channelSchema);
