export type MatchedUser = {
  id: string;
  status: string;
  created_at: string;
  request_id: string;
  consultations: {
    id: string;
    title: string;
    description: string;
    consultation_date: string;
    creator_id: string;
  };
  profiles: {
    id: string;
    display_name: string;
    profile_image_url: string;
    gender: string;
    birthdate: string;
  };
};
