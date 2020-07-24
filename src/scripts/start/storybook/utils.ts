const sortStoriesWithExperiences = (a: string, b: string): number => {
  const storyA = a[0].toLowerCase();
  const storyB = b[0].toLowerCase();
  if (storyA.includes('documentation')) {
    if (storyB.includes('documentation')) {
      return storyA.localeCompare(storyB);
    }
    return -1;
  }

  if (storyB.includes('documentation')) {
    return 1;
  }

  if (storyA.includes('experiences')) {
    if (storyB.includes('experiences')) {
      return storyA.localeCompare(storyB);
    }
    return -1;
  }
  if (storyB.includes('experiences')) {
    return 1;
  }
  return storyA.localeCompare(storyB);
};

export default { sortStoriesWithExperiences };
