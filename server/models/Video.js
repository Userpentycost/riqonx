import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
      required: true,
    },
    youtubeVideoId: {
      type: String,
      required: true,
      unique: true,
    },
    title: String,
    description: String,
    thumbnail: String,
    duration: Number,
    viewCount: Number,
    likeCount: Number,
    commentCount: Number,
    publishedAt: Date,
    
    transcript: String,
    tags: [String],
    category: String,
    language: String,
    
    retentionData: {
      avgRetention: Number,
      retentionCurve: [{ percentage: Number, timestamp: Number }],
      dropOffPoints: [{ timestamp: Number, percentageLost: Number }],
    },
    
    scriptAnalysis: {
      hook: String,
      hookType: String,
      hookDuration: Number,
      mainSegments: [{
        title: String,
        duration: Number,
        engagementLevel: Number,
        keyPoints: [String],
      }],
      callToAction: String,
      ctaPosition: Number,
      ctaType: String,
    },
    
    pacingAnalysis: {
      averagePace: String,
      sceneChanges: Number,
      sceneChangeFrequency: Number,
      transitionTypes: [String],
      musicImpact: String,
    },
    
    hooks: [{
      text: String,
      timestamp: Number,
      effectivenessScore: Number,
      type: String,
    }],
    
    viralScore: {
      overallScore: Number,
      hooks: Number,
      pacing: Number,
      retention: Number,
      engagement: Number,
    },
    
    plagiarismCheck: {
      score: Number,
      similarVideos: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Video', videoSchema);
