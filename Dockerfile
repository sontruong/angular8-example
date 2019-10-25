
# Build a small nginx image with static website
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*.*
COPY dist/KarrosTech-FE/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]