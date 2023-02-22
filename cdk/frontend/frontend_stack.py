from aws_cdk import (
	CfnOutput,
	Stack,
	aws_s3 as s3,
	aws_s3_deployment as s3_deployment,
	aws_cloudfront as cloudfront
)
from constructs import Construct

class FrontendStack(Stack):

	def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
		super().__init__(scope, construct_id, **kwargs)
		self.frontend_source_bucket = s3.Bucket(self, "FrontendAppBucket",
			website_index_document="index.html",
		)
		self.frontend_orgin_access_identity = cloudfront.OriginAccessIdentity(self, "FrontendAppOIA", 
			comment="Access from CloudFront to the bucket."
		)

		self.frontend_source_bucket.grant_read(self.frontend_orgin_access_identity)

		origin_configs = [cloudfront.SourceConfiguration(
			s3_origin_source=cloudfront.S3OriginConfig(
				s3_bucket_source=self.frontend_source_bucket,
				origin_access_identity=self.frontend_orgin_access_identity
			),
			behaviors=[cloudfront.Behavior(is_default_behavior=True)]
		)]
		error_configurations = [cloudfront.CfnDistribution.CustomErrorResponseProperty(
			error_code=404,
			error_caching_min_ttl=0,
			response_code=200,
			response_page_path="/index.html"
		)]
		self.frontend_cloudfront = cloudfront.CloudFrontWebDistribution(self, "FrontendAppCloudFront",
			origin_configs=origin_configs,
			error_configurations=error_configurations
		)

		s3_deployment.BucketDeployment(self, "FrontendAppDeploy",
			sources=[s3_deployment.Source.asset(
				path="frontend/build"
			)],
			destination_bucket=self.frontend_source_bucket,
			distribution=self.frontend_cloudfront,
			distribution_paths=["/*"]
		)

		CfnOutput(self, "AppURL", value=f"https://{self.frontend_cloudfront.distribution_domain_name}/")

