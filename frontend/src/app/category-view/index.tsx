"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Grid } from "@mui/material";
import { fetchCategories } from "@/lib/data";
import { Category } from "@/lib/types";

const CategoryView = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="p-4">
      {selectedCategory ? (
        <div>
          <Button variant="primary" onClick={handleBackClick} className="mb-4">
            Back to Categories
          </Button>
          <h2 className="text-xl font-semibold mb-4">{selectedCategory.name}</h2>
          <Grid container spacing={3}>
            {selectedCategory.scripts
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((script) => (
                <Grid item xs={12} sm={6} md={4} key={script.name}>
                  <Card>
                    <CardContent>
                      <h3 className="text-lg font-medium">{script.name}</h3>
                      <p className="text-sm text-gray-600">{script.date || "N/A"}</p>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-6">Categories</h1>
          <Grid container spacing={3}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={4} key={category.name}>
                <Card
                  onClick={() => handleCategoryClick(category)}
                  className="cursor-pointer hover:shadow-lg"
                >
                  <CardHeader title={category.name} className="text-lg font-semibold" />
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default CategoryView;
